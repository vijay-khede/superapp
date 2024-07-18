#!/bin/sh

NAME=superapp-app
APP_DIR=.
LOG_DIR=${APP_DIR}/logs
JAR=${APP_DIR}/superapp-app-1.0.0.jar

#CMD="java -cp lib/*:. -jar -XX:MaxPermSize=1024m -Xms5120m -Xmx10240m $JAR"
CMD="java -jar --add-opens java.base/java.lang=ALL-UNNAMED -XX:TieredStopAtLevel=1 -noverify -Xverify:none -XX:MaxMetaspaceSize=1024m -Xms2120m -Xmx3240m $JAR"

echo $CMD

LOG_FILE="$LOG_DIR/$NAME.log"
STDERR_LOG="$LOG_DIR/$NAME.err"
PID_FILE="$LOG_DIR/$NAME.pid"
mc alias set minio $MINIO_URL $MINIO_USER $MINIO_PASS

#make the log directory if it doesn't exist
if [ ! -d "$LOG_DIR" ] ; then
        mkdir -p $LOG_DIR
        chmod 777 -R $LOG_DIR
fi

isRunning() {
        [ -f "$PID_FILE" ] && ps `cat $PID_FILE` > /dev/null 2>&1
}

case $1 in
        start)
                if isRunning; then
                        echo "Already started"
                else
                        echo "Starting $NAME"
                        #sudo -u "$USER" $CMD > "$LOG_FILE" 2> "$STDERR_LOG" & echo $! > "$PID_FILE"
                        $CMD > "$LOG_FILE" 2> "$STDERR_LOG" & echo $! > "$PID_FILE"
                        if ! isRunning; then
                                echo "Unable to start, see $LOG_FILE and $stderr_log"
                                exit 1
                        fi
                fi
        ;;
        stop)
                if isRunning; then
                        echo "Stopping $NAME"
                        #sudo -u "$USER" kill `cat $PID_FILE`
                        kill -9 `cat $PID_FILE`
                        rm "$PID_FILE"
                else
                        echo "Not running"
                fi
        ;;
        restart)
                $0 stop
                $0 start
        ;;
        status)
                if isRunning; then
                        echo "Running"
                else
                        echo "Not running"
                fi
        ;;
        *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
    ;;
esac

exit 0
