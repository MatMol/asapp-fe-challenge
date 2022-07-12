const citiesReducer = (state: any = [], action: any) => {
  switch(action.type) {
    case 'UPDATE':
      return state = action.cities;
  }
}

export default citiesReducer;