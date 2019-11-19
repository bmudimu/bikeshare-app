from flask import (Flask, render_template, request, url_for, jsonify, make_response)
from bikesh_cntrl import BikeshareController
from flask_cors import CORS
from flask_restful import Resource, Api


bikeshare = Flask(__name__, static_folder="../client/build/static", template_folder="../client/build")
api = Api(bikeshare)
CORS(bikeshare)


class Serve_CLIENT(Resource): #This route will serve the react client build index.html file
    def __init__(self):
        pass
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'), 200, headers)


class Bike_API(Resource): # This route will handle the requests to the api
    def post(self):
        json_data = request.get_json() # This is a filtering mechanism provided by the frontend requests in a json format
        city = json_data['city']
        month = json_data['month']
        day = json_data['day']
        print(json_data) # CLI print window to see the received filters 

        bike = BikeshareController()
        bike_reports = bike.getBikeStats(city, month, day)
        return {'stats': bike_reports[0], 'raw': bike_reports[1]} # class returns statistics and raw data

api.add_resource(Serve_CLIENT, '/')
api.add_resource(Bike_API, '/api/bikeshare')

if __name__ == '__main__':
     bikeshare.run(debug=True)