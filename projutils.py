import pandas as pd

from surprise import Reader
from surprise import Dataset

# Create ID to name dictionary
def read_item_names():
    file_name = "data/id_to_name.csv"
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