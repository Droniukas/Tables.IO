FROM python:3.9

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r /requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "3001"]
