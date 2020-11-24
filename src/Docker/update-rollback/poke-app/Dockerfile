FROM yuto/nodejs
EXPOSE 80

ENV TEST_APP_URL="http://test-app/"

CMD curl --fail ${TEST_APP_URL} && \
    node ./src/poke.js

COPY ./poke.js /src/poke.js

