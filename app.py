from flask import Flask, request, render_template
import pandas as pd
import pickle
import projutils

app = Flask(__name__)

# Load models
knn_model = pickle.load(open('models/knn_model.pkl','rb'))
svd_model = pickle.load(open('models/svd_model.pkl','rb'))

rid_to_name, name_to_rid = projutils.read_item_names()
RECOMMENDATION_COUNT = 10

# Load anime scores:
anime_scores_df = pd.read_csv('data/anime.csv', index_col='MAL_ID', usecols=['MAL_ID', 'Name', 'Score'])

# Load SVD sample data
svd_samples_df = pd.read_csv('data/frontend_svd_sample.csv')

#region Default route
@app.route('/')
def home():
    return render_template('index.html')
#endregion

#region KNN route
@app.route('/predict',methods=['POST'])
def predict():
    print("KNN Prediction Request")
    """Grabs the input values and uses them to make prediction"""

    anime_name = request.form["anime_name_knn"].lower()
    print(anime_name)

    if anime_name not in name_to_rid:
        print("Invalid Name")
        return render_template('index.html', knn_error=f'Input Error: Invalid Anime Name!')
        
    raw_id = name_to_rid[anime_name]
    
    prediction_ids = knn_model.get_neighbors(knn_model.trainset.to_inner_iid(int(raw_id)), k=RECOMMENDATION_COUNT)  # this returns a list e.g. [127.20488798], so pick first element [0]
    prediction_ids = list((knn_model.trainset.to_raw_iid(inner_id) for inner_id in prediction_ids))
    prediction_names = [rid_to_name[str(rid)] for rid in prediction_ids]
    
    predictions = "Top 10 recommended animes:\n"
    for i in range(RECOMMENDATION_COUNT):
        predictions += str(i+1) + ". " + prediction_names[i] + " (" + anime_scores_df.loc[prediction_ids[i]]['Score'] + ")\n"
    return render_template('index.html', prediction_knn=f'{predictions}')
#endregion

#region SVD Route
@app.route('/predict2',methods=['POST'])
def predict2():
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)