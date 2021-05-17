# Install Python
FROM python:latest as api
RUN apt-get update && apt-get install -y --no-install-recommends nano sudo iputils-ping && rm -rf /var/lib/apt/lists/*

# Create folder code and copy all files
RUN mkdir /home/globeetrotteradmin
ADD requirements.txt /home/globeetrotteradmin
ADD . /home/globeetrotteradmin
WORKDIR /home/globeetrotteradmin
RUN ls -al
# Install Python
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python3-dev
RUN apt-get install -y libssl-dev
#RUN apt-get install -y swig
#RUN pip install m2crypto
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt
