# FROM python:3.6.6-stretch
FROM python:3.6.6-slim-stretch

# RUN apt-get update
# RUN apt-get install make gcc libcairo2-dev

# WORKDIR /usr/src/app
# RUN git clone https://github.com/cleanflight/blackbox-tools.git
# WORKDIR /usr/src/app/blackbox-tools

# RUN make

RUN apt-get update
RUN apt-get install libcairo2-dev -y
WORKDIR /usr/src/app

COPY blackbox-tools ./blackbox-tools

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY PIDAnalyzer.py ./
COPY server.py ./

RUN mkdir -p uploads/plots

CMD [ "python", "./server.py" ]

EXPOSE 8888