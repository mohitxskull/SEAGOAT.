# auto push to github

npm run lint

npm run typecheck

echo ""
echo ""
echo "-------------------------------------------"
echo "f to fix eslint errors."
echo "Click ENTER to continue."
echo "CTRL-C to stop."
echo "-------------------------------------------"

read continue

if (( $continue == "f" ))
then
    npm run lint:fix
    echo ""
    echo ""
fi

git pull origin main

git add .

echo ""
echo ""
echo "-----------------"
echo "Commit message?"
echo "-----------------"

read commentMsg

git commit -m "$commentMsg"

git push -u origin main