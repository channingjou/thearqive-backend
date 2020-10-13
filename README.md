1. [About](https://github.com/balacarter/GlobaltraQs/blob/master/README.md#about)
1. [Rules](https://github.com/balacarter/GlobaltraQs/blob/master/README.md#rules)
1. [Instructions](https://github.com/balacarter/GlobaltraQs/blob/master/README.md#globaltraqs) 
1. [Running](https://github.com/balacarter/GlobaltraQs/blob/master/README.md#running)
1. [Screenshots](https://github.com/balacarter/GlobaltraQs/blob/master/README.md#screenshots)



# About

Senior Design Project of redesigning of the website : [The ArQive](http://thearqive.com/)
Still In Development

# Rules 
Contribution Rules

✔️ Never work on master branch!


✔️ Create a new branch for each set of related bugs or set of related tasks, naming by:


type_PascalCase, example: feat_CareerPage, bug_CareerEmail.


Common short type tokens: wip (work in progress), feat (feature or design), bug (bug fixes)


💻 command to create new branch locally: git checkout -b bug_CareerEmail


⚠️ Important: Before creating a branch, check if someone already started to work on this task and if there's already a branch created for this task, and if there is, please checkout and track the branch with the 💻 command: git checkout --track origin/bug_CareerEmail


--track shorthand for git checkout -b [branch] [remotename]/[branch] where remote name is origin and branch is the specific branch you're pulling from the origin remote


Right after creating a new branch, push it to remote to make it available for everyone, defining the upstream


💻 command: git push -u origin bug_CareerEmail


✔️ Everyday after working, push your local branch updates to remote branch.


⚠️ Important: make sure you're on the correct branch... and push


With 💻 command: git push


✔️ Finished with the task and want to merge?


Fix conflicts if needed, usually happens when more than 1 developer is working on the same file on different branches - communicate with the other developer to make sure their work was not removed


Please make the merge/pull request with as much detail about what you've done/added.


Or lead will merge your branch to master for you. Just ask!

# GlobaltraQs

developmental version: http://globaltraqsdev.com/

# Setup guide

0. Download repos

    git clone https://github.com/balacarter/GlobaltraQs.git
    
    git clone https://github.com/balacarter/arQive-frontend.git

1. Install python3.7 and pip 3

    cd ~

    sudo apt update
    
    sudo apt install software-properties-common
    
    sudo add-apt-repository ppa:deadsnakes/ppa
    
    sudo apt install python3.7

    Use python3.7 -V to verify python 3.7.x has been installed
    
    sudo apt install -y python3-pip
    
    Use pip3 -V to verify pip has been installed
    
2. Install and setup Postgresql

    sudo apt install build-essential libssl-dev libffi-dev python-dev libpq-dev postgresql postgresql-contrib
    
    sudo service postgresql start
    
    sudo -i -u postgres
    
    psql
    
    CREATE DATABASE devdb;
    
    CREATE USER admin WITH PASSWORD 'adminpassword';
    
    ALTER ROLE admin SET client_encoding TO 'utf8';
    
    ALTER ROLE admin SET default_transaction_isolation TO 'read committed';
    
    ALTER ROLE admin SET timezone TO 'UTC';
    
    GRANT ALL PRIVILEGES ON DATABASE devdb TO admin;
    
    (you can make you own db name, username, and password, these will change in production builds for security, be sure to remember your info for creating superusers)
    
    \q
    
    exit
    
3. Create Python virtual environment
    
    cd GlobalTraQs
    
    pip install pipenv
    
    pipenv install
    
    pipenv shell
    
4. Install django and dependencies

    /GlobaltraQs/

    pipenv shell (if not activated from last step)
    
    pip3 install -r requirements.txt
    
5. Update settings.ini

    nano GlobaltraQs/GlobalTraqs/settings.ini
    
    Can copy and paste from below or fill in your own.
    
    [settings]
    
    DEBUG=True
    
    SECRET_KEY=
    
    NAME: devdb
    
    USER: admin
    
    PASSWORD: adminpassword
    
    HOST: localhost
    
    PORT: 5432
    
    EMAIL_USE_TLS=True 
    
    EMAIL_PORT= 587
    
    EMAIL_HOST_USER = 'resetglobaltraqs@gmail.com'
    
    EMAIL_HOST_PASSWORD = 'nmjpfuuvopvbmeri'

    (again these values will change for deployments)
    
6. Migrate, Create a superuser, and Start backend

    /GlobaltraQs/Globaltraqs/

    python manage.py makemigrations
    
    python manage.py migrate

    python manage.py createsuperuser (follow prompts and be sure to use the values for the DB user u made in step 2)

    python manage.py runserver
    
7. Generate API key for frontend
    
    With the DJANGO server running from the previous step, navigate to http://127.0.0.1:8000/admin and log in with the superuser account you made
    
    Generate a new API key (any expiration date)
    
    Copy the key (including the prefix) from the yellow pop up at the top of the page
    
    Add the key to frontend .env file (check discord for .env file info)
    
8. Create user groups - This section is a WIP

    With the DJANGO server running from the previous step, navigate to http://127.0.0.1:8000/admin and log in with the superuser account you made
    
    Go to Authentication and Authorization
    
    Create new groups for Administrators, Moderators, and Anonymous with aproriate permissions assigned
    
    Work in Progress: No definite answers for which exact permissions to add, I assume admins get all permissions and anonymous gets none
    
9. Add categories for pins in DB

    Exit virtual environment or open a new terminal
    
    cd ~
    
    sudo -i -u postgres
    
    psql
    
    \c devdb
    
    INSERT INTO pins_categorytype VALUES (1, Personal, '');
    
    INSERT INTO pins_categorytype VALUES (2, Historical, '');
    
    INSERT INTO pins_categorytype VALUES (3, Community, '');
    
    \q
    
    exit
    
10. Populate DB with pre-made stories (this is a potential fix for FE crashing, also possibly need to populate other tables in DB like users.user)

    GlobaltraQs/GlobalTraqs
    
    python3 manage.py shell
    
    exec(open('old_story_upload.py').read())
    
11. Start Frontend

    In a new terminal open the arQive-frontend dir
    
    npm install
    
    npm start
    
    
    
# old instructions

# settings.ini

1. open up settings.ini

1. Development Set Debug = True; Production = False

1. Input DB info * could use local postgres or sqlite. Ask for Online DB

1. Input Email Info *dont use your personal email. Ask for Email prod

# first terminal

1. install Python 3.7, pip 

1. pip install pipenv

1. pipenv install

1. pipenv shell

1. cd GlobalTraqs

1. python manage.py makemigrations

1. python manage.py migrate

1. python manage.py runserver

# second terminal

1. install latest version of node

1. npm install

1. npm run dev

clear cache in browser

# Running

1. Go to http://127.0.0.1:8000/admin/ and log into superuser account
1. Click Groups
1. Create groups (Administrators, Moderators, and Anonymous)
1. Assign appropriate permissions (will add more permissions later)
1. http://127.0.0.1:8000/api/category 
    1. add Personal, Historical, Community 
    1. Adds the categories

# ScreenShots

![HomePage](GlobalTraqs/media/media/Home.png)

![SearchSideBar](GlobalTraqs/media/media/Home_SideBar_Search.png)

![ViewStory](GlobalTraqs/media/media/ViewStory.png)

![StorySideBarSearch](GlobalTraqs/media/media/home_sidebar.png)
