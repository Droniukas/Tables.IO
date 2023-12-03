import requests
from bs4 import BeautifulSoup
from models.ScrapedJobData import ScrapedJobData


class Scraper():

    def scrape_job_data(self, job_url):
        document = BeautifulSoup(requests.get(job_url).text, 'html.parser')
        job_position = document.h1.string
        company_name = document.find('a', {
            "class": "sub-nav-cta__optional-url"
        }).string
        job_location = document.find("span", {
            "class": "sub-nav-cta__meta-text"
        }).string
        return ScrapedJobData(position=job_position, company=company_name, location=job_location)


