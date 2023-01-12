
echo "Switching Branch Main........................................"
git checkout main

echo "Adding to git........................................"
git add .

echo "Enter commiting Message........................................"
read Msg

echo "commiting with message\"$Msg\" ...................."
git commit -m "$Msg"

echo "git pushing to GitHub........................................"
git push

echo "Building App........................................"
npm run build

echo "Deploying Files to Server........................................"
scp -r build/* root@198.199.82.208:/var/www/iamredapple.com/clientTest

# scp -r build/* root@209.23.8.13:/var/www/html/

echo "Done!! ........................................"