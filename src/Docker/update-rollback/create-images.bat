docker image build -t test-app:v1 ./test-app/
docker image build -t test-app:v2 -f ./test-app/Dockerfile.v2 ./test-app/
docker image build -t poke-app:v1 ./poke-app/
docker image build -t poke-app:v2 -f ./poke-app/Dockerfile.v2 ./poke-app/
