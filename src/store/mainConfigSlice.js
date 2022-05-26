import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        mainArray: [[]],
        startPoint: {
            x: 0,
            y: 0
        },
        endPoint: {
            x: 0,
            y: 0
        },
        betweenPoint: {
            x: 0,
            y: 0
        }
    }
}

export const mainConfigSlice = createSlice({
    name: 'mainConfig',
    initialState,

    reducers: {
        setArrayValue: (state, action) => {
            state.value.mainArray = action.payload
        },
    
        findAndReplace: (state, action) => {

            if(!state.value.mainArray[action.payload.y][action.payload.x].isStartPoint && !state.value.mainArray[action.payload.y][action.payload.x].isEndPoint && !state.value.mainArray[action.payload.y][action.payload.x].isBetweenPoint ) {
                
                if(state.value.mainArray[action.payload.y][action.payload.x].isWeightWall && action.payload.propName === 'isSearch') {
                    state.value.mainArray[action.payload.y][action.payload.x][action.payload.propName] = true
                    return;
                }

                if(state.value.mainArray[action.payload.y][action.payload.x].isWeightWall && state.value.mainArray[action.payload.y][action.payload.x].isSearch) {
                    state.value.mainArray[action.payload.y][action.payload.x][action.payload.propName] = true
                    state.value.mainArray[action.payload.y][action.payload.x].isSearch = false;
                    return;
                }

                let obj = {
                    isRoad: false,
                    isWall: false,
                    isWeightWall: false,
                    isStartPoint: false,
                    isEndPoint: false,
                    isPath: false,
                    isSearch: false,
                    isBetweenPoint: false,
                }
                
                state.value.mainArray[action.payload.y][action.payload.x] = obj
                state.value.mainArray[action.payload.y][action.payload.x][action.payload.propName] = true

                                
            }
        },

        setPoint: (state, action) => {
            state.value[action.payload.propName].x = action.payload.x
            state.value[action.payload.propName].y = action.payload.y
        },

        movePoint: (state, action) => {
            
            if(!(state.value.mainArray[action.payload.y][action.payload.x].isRoad))
               return
            
            const cpy = {...state.value}

            let point = action.payload.propName === 'isStartPoint' ? cpy.startPoint : action.payload.propName === 'isEndPoint' ? cpy.endPoint : cpy.betweenPoint

            cpy.mainArray[point.y][point.x] = {...cpy.mainArray[point.y][point.x], isRoad: true}
            cpy.mainArray[point.y][point.x][action.payload.propName] = false

            point.x = action.payload.x;
            point.y = action.payload.y;

            cpy.mainArray[action.payload.y][action.payload.x] = {...cpy.mainArray[action.payload.y][action.payload.x], isRoad: false}
            cpy.mainArray[action.payload.y][action.payload.x][action.payload.propName] = true

            state.value = {...cpy}
        },

        removeWall: (state, action) => {
             
            const temp = [...state.value.mainArray]

            if(!temp[action.payload.y][action.payload.x].isStartPoint && !temp[action.payload.y][action.payload.x].isEndPoint )
                temp[action.payload.y][action.payload.x] = {...temp[action.payload.y][action.payload.x], isWall: false, isRoad: true}
           
            state.value.mainArray = [...temp]
            
        },

        clearBoard: state => {
            
            let obj = {
                isRoad: true,
                isWall: false,
                isWeightWall: false,
                isStartPoint: false,
                isEndPoint: false,
                isPath: false,
                isSearch: false,
                isBetweenPoint: false
            }

            const temp = new Array(state.value.mainArray.length).fill().map(val => new Array(state.value.mainArray[0].length).fill(obj))

            temp[state.value.startPoint.y][state.value.startPoint.x] = {...temp[state.value.startPoint.y][state.value.startPoint.x], isWall: false, isStartPoint: true} 
            temp[state.value.endPoint.y][state.value.endPoint.x] = {...temp[state.value.endPoint.y][state.value.endPoint.x], isWall: false, isEndPoint: true}

            if(state.value.mainArray[state.value.betweenPoint.y][state.value.betweenPoint.x].isBetweenPoint)
                temp[state.value.betweenPoint.y][state.value.betweenPoint.x] = {...temp[state.value.betweenPoint.y][state.value.betweenPoint.x], isWall: false, isBetweenPoint: true}
            
            state.value.mainArray = temp;
        },

        clear: (state, action) => {
            
            for(let propName in action.payload) {
                let editArr = state.value.mainArray.map(row => row.map(val => val[action.payload[propName]] ? {...val, [action.payload[propName]]: false, isRoad: true}: val ))
                state.value.mainArray = editArr
            }
        },

        fillAllGridWall: state => {

            let obj = {
                isRoad: false,
                isWall: true,
                isWeightWall: false,
                isStartPoint: false,
                isEndPoint: false,
                isPath: false,
                isSearch: false,
                isBetweenPoint: false,
            }

            const temp = new Array(state.value.mainArray.length).fill().map(val => new Array(state.value.mainArray[0].length).fill(obj))

            temp[state.value.startPoint.y][state.value.startPoint.x] = {...temp[state.value.startPoint.y][state.value.startPoint.x], isWall: false, isStartPoint: true} 
            temp[state.value.endPoint.y][state.value.endPoint.x] = {...temp[state.value.endPoint.y][state.value.endPoint.x], isWall: false, isEndPoint: true}

            state.value.mainArray = temp;
        }


    }
})

export const { 
    setArrayValue, 
    findAndReplace,
    setPoint,  
    movePoint, 
    removeWall, 
    clearBoard,
    clear,
    setAnimationArrayValue, 
    fillAllGridWall } = mainConfigSlice.actions

export default mainConfigSlice.reducer