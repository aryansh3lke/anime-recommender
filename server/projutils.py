import pandas as pd

from surprise import Reader
from surprise import Dataset

myanimelist_info_df = pd.read_csv("./data/myanimelist_info_cleaned.csv")
myanimelist_recs_df = pd.read_csv("./data/myanimelist_recs_cleaned.csv")

myanimelist_titles = myanimelist_info_df['title'].tolist()

# Create ID to name dictionary
def read_item_names():
    file_name = "./data/id_to_name.csv"
    rid_to_name = {}
    name_to_rid = {}
    with open(file_name, encoding="ISO-8859-1") as f:
        # skip header line
        next(f)
        for line in f:
            line = line.rstrip()
            line = line.split(",")
            rid_to_name[line[0]] = line[1]
            name_to_rid[line[1].lower()] = line[0]

            # english name
            name_to_rid[line[2].lower()] = line[0]

    return rid_to_name, name_to_rid

# Create Suprise dataset from a dataframe
def create_dataset_from_df(df):
    reader = Reader(rating_scale=(1,10))
    return Dataset.load_from_df(df, reader)

# Appends a new user to the df for refitting and predicting
# We need to do this because suprise does not support iterative training with SVD
def create_predict_dataset(base_train_df, anime_ids, ratings):
    predictor_df = base_train_df.copy()
    for i in range(len(anime_ids)):
        predictor_df.loc[len(predictor_df)] = [-1,anime_ids[i], ratings[i]]
    
    return create_dataset_from_df(predictor_df)

# Generate predictions for a set of anime_ids and a user_id
def get_predictions(model_instance, user_id, anime_ids):
    # Create prediction set
    reader = Reader(rating_scale=(1, 10))
    predict_data = Dataset.load_from_df(pd.DataFrame({'User ID' : user_id, 'Anime ID' : anime_ids, 'Rating' : -1}), reader)

    # Predict
    predictions = model_instance.test(predict_data.build_full_trainset().build_testset())

    return predictions


# Print out information for top N predictions (use in conjunction with get_predictions)
def get_top_n_string(predictions, n, rid_to_name):
    # Sort descending
    predictions = sorted(predictions, key=lambda x: x.est, reverse=True)
    
    display_string = ""
    display_string += "Top {} recommended animes:".format(n)

    # Print information about top n
    ranking = 1
    for prediction in predictions[:n]:
        anime_id = prediction.iid
        rating = prediction.est
        name = rid_to_name[str(int(anime_id))]
        display_string += "\n{}. {} ({})".format(ranking, name, round(rating, 2))
        ranking += 1
    
    return display_string

def read_anime_list():
    file_name = "./data/id_to_name.csv"
    anime_list = []
    
    with open(file_name, encoding="ISO-8859-1") as f:
        # skip header line
        next(f)
        for line in f:
            line = line.rstrip()
            line = line.split(",")
            anime_list.append(line[1])
            
            # english name
            anime_list.append(line[2])

    return anime_list

def read_anime_images():
    file_name = "./data/anime_images.csv"
    anime_images = {}

    # Read in anime images as semicolon separated csv file
    with open(file_name, encoding="ISO-8859-1") as f:
        # skip header line
        next(f)
        for line in f:
            line = line.rstrip()
            line = line.split(",")
            anime_images[line[0]] = line[1]

    return anime_images


def get_myanimelist_id(anime_name):
    return myanimelist_info_df[myanimelist_info_df['title'] == anime_name]['anime_id'].values[0]

def get_myanimelist_titles():
    return myanimelist_titles

def get_myanimelist_suggestions(input_anime):
    input_anime = input_anime.lower()
    return sorted(list(set([anime for anime in myanimelist_titles if anime.lower().startswith(input_anime)])))

def get_myanimelist_recommendations(anime_name):
    anime_recs = []

    # Get the anime id of the input anime with myanimelist_info_df
    anime_id = get_myanimelist_id(anime_name)
    
    # For every row in myanimelist_recs_df where animeA matches anime_id, add the animeB to the recommendations list
    for index, row in myanimelist_recs_df[myanimelist_recs_df['animeA'] == anime_id].iterrows():
        rec_id = row['animeB']

        try:
            anime_rec_info = myanimelist_info_df[myanimelist_info_df['anime_id'] == rec_id]
            rec_name = anime_rec_info['title'].values[0]
            rec_image = anime_rec_info['main_pic'].values[0]
            rec_url = anime_rec_info['anime_url'].values[0]
            rec_score = anime_rec_info['score'].values[0]
            rec_popularity = int(anime_rec_info['popularity_rank'].values[0])
            rec_synopsis = anime_rec_info['synopsis'].values[0].strip()
            
            anime_recs.append({'name': rec_name, 
                               'image': rec_image, 
                               'url': rec_url, 
                               'score': rec_score, 
                               'popularity': rec_popularity,
                               'synopsis': rec_synopsis})
        except IndexError:
            continue

    return anime_recs