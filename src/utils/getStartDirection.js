export const getStartDirection = (startPoint, endPoint) => {

    const xDirection = startPoint.x - endPoint.x
    const yDirection = startPoint.y - endPoint.y

    if(xDirection >= 0 && yDirection >= 0)  {

        if(Math.abs(xDirection) > Math.abs(yDirection))
            return -90
        
        return 0
    }

    if(xDirection >= 0 && yDirection <= 0)  {

        if(Math.abs(xDirection) > Math.abs(yDirection))
            return -90
        
        return 180
    }

    if(xDirection <= 0 && yDirection <= 0) {

        if(Math.abs(xDirection) > Math.abs(yDirection))
            return 90

        return 180
    }

    if(xDirection <= 0 && yDirection >= 0) {

        if(Math.abs(xDirection) > Math.abs(yDirection))
            return 90

        return 0
    }

}