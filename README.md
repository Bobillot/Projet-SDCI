The code in this repo is related to the 5SDBD - SDCI Project (year 2019-2020)
It contains the work of Thomas Bobillot and Raphaël Perrochat, based on previous codes made by Clovis Ouedraogo and Samir Medjiah (LAAS & UPS).

The following procedure describes how to execute the code :

1. Pull this repo in the SDCI project dedicated virtual machine (to be able to use containernet, ryu and vim-emu) :
```
git init
git pull http://github.com/Bobillot/Projet-SDCI
```
2. You might need to fix DNS problems (replace daemon.json fields with your IPV4 DNS IP(s)):
```
cp spare_files/daemon.json /etc/docker 
service docker restart
```
3. Build docker images from the 5 dockerfiles (BaseElements, Stress, VnfMonitoring, GI, LB) : 
 - For basic elements (devices, GFs, server and initial GI) :
 ```
 cd dockerfileBaseElements
 docker build -t sdci:sdci .
 ```
 - For the stressed device vnf :
 ```
 cd dockerfileStress
 docker build -t vnf:stress .
 ```
 - For the monitoring vnf :
 ```
 cd dockerfileVnfMonitoring
 docker build -t vnf:monitor .
 ```
 - For the virtual GI vnf :
 ```
 cd dockerfilegi
 docker build -t vnf:gi .
 ```
 - For the LB vnf :
 ```
 cd dockerfilelb
 docker build -t vnf:lb .
 ```
 4. Start the emulated containernet network from a terminal A :
  ```
  python ctnet_dc_one_sw.py
  ```
 5. Start the monitoring vnf from a terminal B :
 ```
 vim-emu compute start -d dc1 -n monitor --image vnf:monitor --net '(id=net,ip=10.0.0.209/24)'
 ```
 6. Start the MAPE-K loop from a terminal C (you might need to install maven):
  ```
  apt install maven
  cd gctrl
  mvn clean install exec:java -Dexec.mainClass="Main"
   ```
 
 The loop is now running. It should run infinitly as the triggering threshold is quite high (latency thereshold = 10ms) and the measured latency should be around 3 ms.
 To trigger the execution of plan B (UC2-7 which are the deployment of a Load Balancer, of a Virtual GI and all the required traffic redirections), you will need to stress the GI.
 
 7. To do so, deploy a stressed device vnf from the terminal B :
  ```
   vim-emu compute start -d dc1 -n stressDevice --image vnf:stress --net '(id=net,ip=10.0.0.212/24)'
   ```
   
 You should see that the latency threshold of 10 ms ends up being surpassed, and that the MAPE-K loop executes plan B. 


If at some point you end up doing a Ctrl-C in the terminal A (where containernet is running), you will need to clean the mininet environnement with 
> mn -c
