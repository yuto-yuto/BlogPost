docker image build -t opt:v1 -f Dockerfile.v1 .
docker image build -t opt:v2 -f Dockerfile.v2 .
docker image build -t opt:v3 -f Dockerfile.v3 .
docker image build -t opt:multi-stage -f Dockerfile-multi-stage .