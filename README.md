# nodejs_mongodb_example

A small example application for test deployments on anynines.



## Run locally

Adjust the database connection credentials in the set_dev_environment.sh file and source it's contents. This is needed to insert the VCAP_SERVICES json hash into the application shell's environment. This simulates the process of anynines app containers.

	vi set_dev_environment.sh
    source set_dev_environment.sh
    DEBUG=* bin/www

## Deployment

Copy over the example manifest and rename all occurences of app_name with the desired application name.
    
    cp manifest.yml.example manifest.yml

    cf push 