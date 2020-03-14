import requests
import json 

from config import gkey 

with open(NBAdataset.csv, 'r') as csv_file:
    colleges =

#list of colleges
colleges = ["University of California", "Florida State University" ]

# Build the endpoint URL
for college in colleges:
    target_url = ('https://maps.googleapis.com/maps/api/geocode/json?'
    'address={0}&key={1}').format(college, gkey)
    geo_data = requests.get(target_url).json()
    lat = geo_data["results"][0]["geometry"]["location"]["lat"]
    lng = geo_data["results"][0]["geometry"]["location"]["lng"]
    coll_coord = {"name": college, "lat": lat, "long": lng}
    #print the information
    print(coll_coord)

