# NodeBotPi
A raspberry pi and arduino robot that uses a Node.js webpage for control

# Usage and setup
NodeBotPi is full containerized and is designed to run with no configuration changes. This document assumes that the raspberry pi is running a fresh installation of Raspbian and has docker as well as docker-compose installed and that the user has either a monitor and keyboard attached, or has a ssh session into the raspberry pi. For more information on setting up raspbian and installing docker / docker-compose, see the following links:

* Raspbian Install: https://www.raspberrypi.org/documentation/installation/installing-images/
* Docker and Docker-Compose Install: https://manre-universe.net/how-to-run-docker-and-docker-compose-on-raspbian/

Optionally, we will change the Raspberry pi to serve as an access point, allowing connection and control away from an existing network. This step is completely optional, but will allow use of the system in isolated environments or environments where finding the pi's IP may be difficult or infeasible (such as a university network).

Once these prerequisites are installed, only a few commands are needed to install the NodeBotPi files. 

## Steps to setup NodeBotPi
Install Git

```shell
sudo apt install git
```

### Clone the repository

```shell
cd ~
git clone https://github.com/ZacharyJoswick/NodeBotPi.git
```

### Build the docker images

```shell
cd ~/NodeBotPi
docker-compose build
```

### OPTIONAL: Setup Pi as access point

Follow the documentation at this link to setup the raspberry pi as an access point: https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md

### Run the containers
```shell
cd ~/NodeBotPi
docker-compose up -d
```

### Stop the containers
```
cd ~/NodeBotPi
docker-compose down
```

# BOM
NodeBotPi uses the following electronic and mechanical components




# Wiring Diagram

