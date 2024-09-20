# https://ui.aceternity.com/components/3d-card-effect
# https://ant.design/

# supabase database - https://supabase.com/dashboard/project/yjhyvshvauyggmtphlvm/settings/database
# postgresql://postgres.yjhyvshvauyggmtphlvm:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres


# 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 - github token
# git remote set-url  origin https://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@github.com/Emeriego/DriveBy.git - this would update remote origin

# start the django server like this
source drivebuy_env/bin/activate
pip install -r requirements.txt
python manage.py make migrations
python manage.py migrate
pip manage.py runserver
