import pandas as pd

myanimelist_info_df = pd.read_csv("api/data/myanimelist_info_cleaned.csv")
myanimelist_recs_df = pd.read_csv("api/data/myanimelist_recs_cleaned.csv")

myanimelist_titles = myanimelist_info_df['title'].tolist()

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