from flask import Flask, request, jsonify
import logging
import api.utils.projutils as projutils
from dotenv import load_dotenv
from os import getenv
import urllib.parse
from waitress import serve

app = Flask(__name__)
load_dotenv()

# Custom logging filter to filter out logs for the specific endpoint
class EndpointFilter(logging.Filter):
    def filter(self, record):
        return '/api/python/get_myanimelist_suggestions' not in record.getMessage()
        
# Configure the werkzeug logger to use the custom logging filter
werkzeug_logger = logging.getLogger('werkzeug')
werkzeug_logger.addFilter(EndpointFilter())

#region MyAnimeList Suggestions Route
@app.route('/api/python/get_myanimelist_suggestions', methods=['GET'])
def get_anime_suggestions():
    input_anime = request.args.get("input_anime")
    return jsonify({"suggestions": projutils.get_myanimelist_suggestions(input_anime)}), 200
#endregion

#region Anime Suggestions Route
@app.route('/api/python/get_myanimelist_recommendations', methods=['GET'])
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