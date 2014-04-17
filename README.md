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

Copy over the example manifest and rename all occurences of app_name with the desired application name. You can deploy the application to anynines by executing the cf push command from the applications root directory: 
<pre>    
cp manifest.yml.example manifest.yml
cf push 
</pre>

For further information on how to deploy applications to anynines please refer to [our documentation](https://support.anynines.com/entries/24083808-How-to-deploy-your-apps-on-anynines).
