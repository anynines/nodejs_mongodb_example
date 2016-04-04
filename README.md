# Node.js x MongoDB example application

We wrote a small example application to test deploying Node.js applications on [anynines](http://www.anynines.com/).

## Run locally

Adjust the database connection credentials in the set_dev_environment.sh file and source it's contents. This is needed to insert the VCAP_SERVICES json hash into the application shell's environment. This simulates the process of anynines app containers.

<pre>
vi set_dev_environment.sh
source set_dev_environment.sh
DEBUG=* bin/www
</pre>

## Deploy your app on anynines

### Service dependencies

* MongoDB

### Deployment Instructions

Install the cf go cli: https://github.com/cloudfoundry/cli/releases

Edit the deployment manifest

		$ cp manifest.yml.example manifest.yml
		$ vim manifest.yml # exchange all occurences of app_name with your desired application identifier

Create the needed services

		$ cf create-service mongodb 100 mongodb-app_name

Deploy the application

		$ cf push
