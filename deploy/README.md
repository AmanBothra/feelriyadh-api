# Feel Riyadh API Deployment

These commands assume the Django project lives at `/home/feelriyadh-api`, the virtualenv is `/home/feelriyadh-api/myenv`, and the API domain is `api.feelriyadh.com`.

## 1. Prepare the app

```bash
cd /home/feelriyadh-api
source myenv/bin/activate
git pull
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py check
```

For production, set these in `/home/feelriyadh-api/.env`:

```env
DEBUG=False
ALLOWED_HOSTS=api.feelriyadh.com,feelriyadh.com,www.feelriyadh.com
```

Use `ALLOWED_HOSTS=*` only if you intentionally want to accept every host.

## 2. Install and start Gunicorn with systemd

```bash
sudo cp /home/feelriyadh-api/deploy/gunicorn.service /etc/systemd/system/feelriyadh-api.service
sudo systemctl daemon-reload
sudo systemctl enable feelriyadh-api
sudo systemctl start feelriyadh-api
sudo systemctl status feelriyadh-api
```

If your Linux user is not `feelriyadh-api`, edit `User=` in `/etc/systemd/system/feelriyadh-api.service`, then run:

```bash
sudo systemctl daemon-reload
sudo systemctl restart feelriyadh-api
```

## 3. Configure Nginx

```bash
sudo cp /home/feelriyadh-api/deploy/nginx-feelriyadh-api.conf /etc/nginx/sites-available/feelriyadh-api
sudo ln -s /etc/nginx/sites-available/feelriyadh-api /etc/nginx/sites-enabled/feelriyadh-api
sudo nginx -t
sudo systemctl reload nginx
```

## 4. Add HTTPS

```bash
sudo certbot --nginx -d api.feelriyadh.com
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Useful logs

```bash
sudo journalctl -u feelriyadh-api -n 100 --no-pager
sudo tail -n 100 /var/log/nginx/error.log
```
