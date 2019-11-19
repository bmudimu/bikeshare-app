import pandas as pd
import numpy as np
import time
import requests, os, json
from flask import (jsonify)


class BikeshareController:
    """
    This is a class for all the data processing
    
    """
    
    def getBikeStats(self, city, month, day):
        """
        The function to calculate the statistics and process raw data
        Parameters:
        city (str): city filter
        month (str) month filter
        day (str) day filter

        Returns:
        json: 2 objects, 1 with the statistics and the other with raw data
        """

        # Read the csv file based on filters given
        df = pd.read_csv(city.replace(" ", "_").lower()+".csv").fillna(0) # Replace all null values with 0 to avoid errors when converting to json format
        df['Start Time'] = pd.to_datetime(df['Start Time'])
        df['Hour'] = df['Start Time'].dt.hour
        df['Day'] = df['Start Time'].dt.day
        df['Month'] = df['Start Time'].dt.month
        df['Day_of_Week'] = df['Start Time'].dt.weekday_name
        df['Month_name'] = df['Start Time'].dt.month_name()

        if month.lower() != 'all': # If a month filter has been provided
            months = dict(zip(df.Month_name.str.lower(), df.Month))
            month = months[month.lower()]
            df = df[df['Month'] == month]
        
        if day.lower() != 'all': # If a day filter has been provided
            df = df[df['Day_of_Week'] == day.title()]
        
        # A dictionary object to prepare for json conversion
        bike_stats = {
            'freq_month_of_travel': str(df.Month_name.mode()[0]),
            'freq_day_of_travel' : df.Day_of_Week.mode()[0],
            'freq_hour_of_travel' : str(df.Hour.mode()[0]),
            'used_start_station' : df['Start Station'].mode()[0],
            'used_end_station' : df['End Station'].mode()[0],
            'used_start_to_end_route' : pd.Series(list(zip(df['Start Station'], df['End Station']))).mode()[0],
            'total_trip_duration' : str(sum(df['Trip Duration'])),
            'mean_time_travel' : str(df['Trip Duration'].replace(0,np.nan).mean()) # Using replace to ensure mean is calculated correctly
        }
        # Handle missing columns in the csv files
        if 'Gender' in df.columns:
            gender_count_dict = df['Gender'].replace(0,np.nan).value_counts().to_dict() # Avoiding errors when converting to lowercase since we have str and float
            for key in gender_count_dict:
                bike_stats[key.lower() + '_count'] = gender_count_dict[key]
        else:
            bike_stats['female_count'] = 'N/A'
            bike_stats['male_count'] = 'N/A'
        if 'User Type' in df.columns:
            user_count_dict = df['User Type'].replace(0,np.nan).value_counts().to_dict() # Avoiding errors when converting to lowercase since we have str and float
            
            for key in user_count_dict:
                bike_stats[key.lower() + '_count'] = user_count_dict[key]          
        else:
            bike_stats['customer_count'] = 'N/A'
            bike_stats['subscriber_count'] = 'N/A'
            bike_stats['dependent_count'] = 'N/A'
        if 'Birth Year' in df.columns:
            bike_stats['earliest_birth_year'] = str(df['Birth Year'].replace(0,np.nan).min())
            bike_stats['recent_birth_year'] = str(df['Birth Year'].replace(0,np.nan).max())
            bike_stats['common_birth_year'] = str((df['Birth Year']).mode()[0])
        else:            
            bike_stats['earliest_birth_year'] = 'N/A'
            bike_stats['recent_birth_year'] = 'N/A'
            bike_stats['common_birth_year'] = 'N/A'    

        json_reports = json.dumps(bike_stats)
        df.columns = df.columns.str.replace(' ', '_')
        df_dict = df.loc[:, 'Start_Time':'Hour'].head(8).to_dict('records') # Object to get a view of the raw data. Return first 8 rows
        raw_json = json.dumps(df_dict, default=str)

        return json_reports, raw_json
