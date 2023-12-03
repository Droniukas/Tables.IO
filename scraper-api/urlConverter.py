from urllib.parse import parse_qs
from urllib.parse import urlparse

from fastapi import HTTPException, status
from pathlib import PurePosixPath


class UrlConverter():

    def convert_to_valid_job_posting_url(self, initial_url: str):
        if not initial_url.startswith("https://"):
            initial_url = f"https://{initial_url}"

        if not initial_url.startswith("https://www.linkedin.com/jobs"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid url")

        if "https://www.linkedin.com/jobs/view/" in initial_url:
            # ! here we could be allowing invalid urls
            return initial_url

        elif "currentJobId" in initial_url:
            parsed_url = urlparse(initial_url)
            job_id = parse_qs(parsed_url.query)["currentJobId"][0]
            return f"https://www.linkedin.com/jobs/view/{job_id}"

        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid url")
