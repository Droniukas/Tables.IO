from pydantic import BaseModel


class ScrapedJobData(BaseModel):
    position: str
    company: str
    location: str
