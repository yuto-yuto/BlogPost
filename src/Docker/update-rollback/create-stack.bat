docker-compose ^
-f docker-compose.yml ^
-f docker-compose-pro.yml ^
config > stack-v1.yml

docker-compose ^
-f docker-compose.yml ^
-f docker-compose-pro.yml ^
-f docker-compose-v2-1.yml ^
config > stack-v2-1.yml

docker-compose ^
-f docker-compose.yml ^
-f docker-compose-pro.yml ^
-f docker-compose-v2-2.yml ^
config > stack-v2-2.yml

docker-compose ^
-f docker-compose.yml ^
-f docker-compose-pro.yml ^
-f docker-compose-v3-bad.yml ^
config > stack-v3-bad.yml

docker-compose ^
-f docker-compose.yml ^
-f docker-compose-pro.yml ^
-f docker-compose-v3-good.yml ^
config > stack-v3-good.yml
