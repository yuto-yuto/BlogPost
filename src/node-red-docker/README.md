# How to run Node-RED in docker container

## First time

This command download Node-RED image from Docker hub and start it. Host directory flow is mounted to the container and flow files are saved there. If you want to run this in command prompt or powershell you don't need `winpty`. This is necessary when you want to run it on git-bash.

```bash
winpty docker run -it -p 1880:1880 -v /$(PWD)/flow:/data --name mynodered nodered/node-red
```

## Second time

```bash
winpty docker run -it -p 1880:1880 -v /$(PWD)/flow:/data nodered/node-red
```
