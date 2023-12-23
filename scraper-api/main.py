from fastapi import FastAPI
from models.InputUrl import InputURL
from scraper import Scraper
from urlConverter import UrlConverter

app = FastAPI()
scraper = Scraper()
url_converter = UrlConverter()

@app.post("/extractData")
def extract_data(input_url: InputURL):
    url = url_converter.convert_to_valid_job_posting_url(input_url.url)
    return scraper.scrape_job_data(url)
