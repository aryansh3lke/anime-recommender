from flask import Flask, request, render_template, jsonify, Blueprint
from flask_cors import CORS
import logging
import pandas as pd
import pickle
import projutils
from dotenv import load_dotenv
from os import getenv
import urllib.parse
from waitress import serve

app = Flask(__name__)
CORS(app)
load_dotenv()

# Custom logging filter to filter out logs for the specific endpoint
class EndpointFilter(logging.Filter):
    def filter(self, record):
        return '/api/get_myanimelist_suggestions' not in record.getMessage()
        
# Configure the werkzeug logger to use the custom logging filter
werkzeug_logger = logging.getLogger('werkzeug')
werkzeug_logger.addFilter(EndpointFilter())

# Load models
knn_model = pickle.load(open('./models/knn_model.pkl','rb'))
svd_model = pickle.load(open('./models/svd_model.pkl','rb'))

rid_to_name, name_to_rid = projutils.read_item_names()
RECOMMENDATION_COUNT = 10

# Load anime scores:
anime_scores_df = pd.read_csv('./data/anime.csv', index_col='MAL_ID', usecols=['MAL_ID', 'Name', 'Score'])

# Load anime images:
anime_images = projutils.read_anime_images()

# Load SVD sample data
svd_samples_df = pd.read_csv('./data/frontend_svd_sample.csv')

#region Default route
@app.route('/')
def home():
    return "You have reached the Anime Recommender Flask backend server!"
#endregion

#region KNN route
@app.route('/api/predict_knn', methods=['GET'])
def predict_knn():
    print("KNN Prediction Request")
    """Grabs the input values and uses them to make prediction"""

    anime_name = request.args.get("anime_name").lower()
    if anime_name == None or anime_name == "":
        return jsonify({'error': 'Anime Name not provided!'}), 404

    print(anime_name)

    if anime_name not in name_to_rid:
        print("Invalid Name")
        return jsonify({'error': 'Invalid Anime Name!'}), 404
        
    raw_id = name_to_rid[anime_name]
    
    try:
        prediction_ids = knn_model.get_neighbors(knn_model.trainset.to_inner_iid(int(raw_id)), k=3 * RECOMMENDATION_COUNT)  # this returns a list e.g. [127.20488798], so pick first element [0]
        prediction_ids = list((knn_model.trainset.to_raw_iid(inner_id) for inner_id in prediction_ids))
        prediction_names = [rid_to_name[str(rid)] for rid in prediction_ids]
    except IndexError:
        return jsonify({'error': 'Anime not found!'}), 404
    
    predictions = []
    count = 0
    for i in range(3 * RECOMMENDATION_COUNT):
        prediction_name = prediction_names[i]
        prediction_score = anime_scores_df.loc[prediction_ids[i]]['Score']
        prediction_image = anime_images.get(prediction_names[i], '')

        if prediction_score == 'Unknown' or prediction_image == '':
            continue

        predictions.append([prediction_name, prediction_score, prediction_image])
        count += 1
        if count == RECOMMENDATION_COUNT:
            break
    
    predictions.sort(key=lambda x: x[1], reverse=True)

    recommendation_list = []
    for pred in predictions:
        recommendation_list.append({ 'name': pred[0], 'score': pred[1], 'image': pred[2] })
    
    return jsonify({'recommendations': recommendation_list}), 200
#endregion

#region SVD Route
@app.route('/api/predict_svd', methods=['POST'])
def predict_svd():
    print("SVD Prediction Request")
    user_profile_string = request.form["anime_name_svd"]
    
    # Parse input
    anime_ids = []
    ratings = []

    input_lines = user_profile_string.splitlines()
    for line in input_lines:
        try:
            components = line.split('\\')
            name = components[0].strip().lower()

            if name not in name_to_rid:
                return render_template('index.html', svd_error=f'Input Error: Invalid Anime Name! ({components[0].strip()})', svd_input=user_profile_string)

            rating = int(components[1].strip())
            id = name_to_rid[name]

            # print(f'{name} ({id}); {rating}')
            anime_ids.append(int(id))
            ratings.append(int(rating))
        except:
            return render_template('index.html', svd_error=f'Input Error: Please enter ratings one per line with the format "anime name \\ rating"', svd_input=user_profile_string)
    
    if(len(anime_ids) == 0):
        return render_template('index.html', svd_error=f'Input Error: Please enter ratings one per line with the format "anime name \\ rating"', svd_input=user_profile_string)
    
    try:
        # Create dataset
        dataset = projutils.create_predict_dataset(svd_samples_df, anime_ids, ratings)

        # Retrain
        print("Fitting SVD")
        svd_model.fit(dataset.build_full_trainset())

        # Generate predictions
        print("Generating Anime IDs")
        predict_anime_ids = list(rid_to_name)

        # Remove user provided ids from being predicted
        predict_anime_ids = [int(id) for id in predict_anime_ids if int(id) not in anime_ids]
        predict_anime_ids = pd.unique(predict_anime_ids)

        print("Getting Predictions")
        predictions = projutils.get_predictions(svd_model, -1, predict_anime_ids)

        # Get top N
        result = projutils.get_top_n_string(predictions, RECOMMENDATION_COUNT, rid_to_name)
        return render_template('index.html', prediction_svd=f'{result}', svd_input=user_profile_string)
    except Exception as exc:
        print(exc)
        return render_template('index.html', svd_error=f'Model Error: Something went wrong with model fitting', svd_input=user_profile_string)
#endregion

#region MyAnimeList Suggestions Route
@app.route('/api/get_myanimelist_suggestions', methods=['GET'])
def get_anime_suggestions():
    input_anime = request.args.get("input_anime")
    return jsonify({"suggestions": projutils.get_myanimelist_suggestions(input_anime)}), 200
#endregion

#region Anime Suggestions Route
@app.route('/api/get_myanimelist_recommendations', methods=['GET'])
def get_anime_recommendations():
    # manually decode the URI encoded string
    anime_name = request.query_string.decode('utf-8').split('anime_name=')[1]
    anime_name = urllib.parse.unquote(anime_name)
    return jsonify({"recommendations": projutils.get_myanimelist_recommendations(anime_name)}), 200
#endregion

if __name__ == "__main__":
    # development
    if str(getenv('FLASK_DEBUG', False)).lower() in ['1', 'true']:
        app.run(host="0.0.0.0", port=8000, debug=True)
    # production
    else:
        serve(app, host="0.0.0.0", port=8000)