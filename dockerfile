FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get update && apt-get install -y \
    curl \
    wget

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs && \
    echo "NODE VERSION $(node -v)"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./ ./

RUN wget https://github.com/tech-greedy/generate-car/releases/download/v4.0.1/generate-car_4.0.1_linux_amd64.tar.gz && \
    tar -xvf generate-car_4.0.1_linux_amd64.tar.gz && \
    mv generate-car /usr/local/bin

CMD ["npm", "start"]
