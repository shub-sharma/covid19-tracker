import requests, os
IMAGE_API_LINK = "https://www.countryflags.io/"
IMAGE_EXTRA_PARAMS = "/shiny/64.png"

COVID_API = "https://api.covid19api.com/summary"


r = requests.get(COVID_API)
response = r.json()

for country in response['Countries']:
    country_code = country['CountryCode']
    image_download_command = "wget " + IMAGE_API_LINK + country_code + IMAGE_EXTRA_PARAMS + " -O " + "images/" + country_code + ".png"
    os.system(image_download_command)
