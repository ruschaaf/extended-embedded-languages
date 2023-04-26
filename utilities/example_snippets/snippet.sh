# This is a basic shell script

print_host() {
    HOSTNAME=`hostname`
    if [ -n ${HOSTNAME} ]; then 
        echo "Hello world from ${HOSTNAME}"
    fi
}
