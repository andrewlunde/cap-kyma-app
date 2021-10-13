echo "Starting EntryPoint.sh"
FILE="my.db"
SRCDIR="/usr/src/app/app/var/"
DSTDIR=$SRCDIR"tmp/"
if [[ -f $DSTDIR$FILE ]];then
    echo "$DSTDIR$FILE exists"
else
    echo "$DSTDIR$FILE doesn't exist"
    echo "cp -n $SRCDIR$FILE $DSTDIR"
    cp $SRCDIR$FILE $DSTDIR
fi
echo "Adjusting package.json"
sed -i -e "s/app\/var\/my.db/app\/var\/tmp\/my.db/g" /usr/src/app/package.json
echo "Ending EntryPoint.sh"
echo "Starting NPM START"
npm start