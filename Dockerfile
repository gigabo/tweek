FROM ubuntu:14.04

MAINTAINER Bo Borgerson <gigabo@gmail.com>

RUN apt-get update
RUN apt-get install -y ruby ruby-dev make libsasl2-dev

RUN gem install bundle

# Add these first, to preserve the cache.
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

WORKDIR /app/

RUN bundle install

ADD . /app/

EXPOSE 80

CMD ["unicorn", "config.ru", "-p", "80"]
