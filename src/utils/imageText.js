import Tesseract from 'tesseract.js'

export const handleRecognizeImage = async ({buffer, tipster, type}) => {
  try {
    const out = await Tesseract.recognize(buffer, 'spa', { /* logger: e => console.log(e)*/})

    const { data : { text }} = out;

    const tipFromImage = transformTextToTip({text, tipster, type})
    return tipFromImage
  } catch (error) {
    console.log('error al intentar leer buffer: ', error)
  }
    
}

export const transformTextToTip = ({text, tipster, type}) => {
  const linesArray = text.split("\n").slice(1).filter((line) => (line !== "")).slice(0, -1)

  const selections = getParsedSelectionsFromLines(linesArray)

  const betName = getBetName(selections)


  const betDate = getBetDateFromLines(linesArray)

  const { spent, potentialReturn} = extractPrices(linesArray)

  const status = "pending"

  const parsedSelections = parseSelections(selections)

  const tip = {
    name: betName,
    tipster,
    date: betDate,
    spent,
    potentialReturn,
    status,
    type,
    selections: parsedSelections

  }

  return tip
}

const getParsedSelectionsFromLines = (lines) => {

  return lines.filter((el) => {
    if (el.startsWith('o ')) {
      return parseSelection(el)
    }
  }).map(selection => selection.split(' ').slice(0, -1).slice(1).join(' '))
}

const parseSelection = (selection) => {
  return selection.split(' ').slice(0, -1).slice(1).join(' ')
}

const getBetName = (selectionsArray) => {
  if (selectionsArray.length === 1) return selectionsArray[0]
  if (selectionsArray.length === 2) return `${selectionsArray[0]} + ${selectionsArray[1]}`

  return `${selectionsArray[0]} + ${selectionsArray.length - 1}`
}

const getBetDateFromLines = (lines) => {
  const listOfDates = extractDates(lines)

  console.log('lista de fechas: ', listOfDates)
  
  const datesTimestamp = listOfDates?.map(date => {
    let dateArray = date.split(' ')
    dateArray[dateArray.length - 1] = `${new Date().getFullYear().toString()} ${dateArray[dateArray.length - 1]}`

    return new Date(dateArray.join(' ')).getTime()
  })

  if (!datesTimestamp.length) {
    const now = new Date()
    now.setHours(now.getHours() + 2)

    return now
  }

  return new Date(Math.max(...datesTimestamp))
}

const extractDates = (lines) => {
  const fullDate = /((Lun|Mar|Mié|Jue|Vie|Sáb|Dom) \d{1,2} [a-z]{3} (\d{1,2}:\d{2}))/g // Formato: "Mar/Mié 6(16) feb 12:45"
  const withoutTime = /((Lun|Mar|Mié|Jue|Vie|Sáb|Dom) \d{1,2} [a-z]{3})/g // Formato: "Mar/Mié 7/17 feb"
  const monthAndTime = /^([a-z]{3} (\d{1,2}:\d{2}))/g // Formato: "feb 12:45"
  const weekdayAndMonthDay = /((Lun|Mar|Mié|Jue|Vie|Sáb|Dom) (\d{1,2}))/g// Mar/Mié 7/17
  const time = /^(\d{1,2}:\d{2})/g // Formato: "12:45"
  const monthDayMonthAndTime = /^(\d{1,2} [a-z]{3} (\d{1,2}:\d{2}))/g // 6(16) feb 12:45
  
  // Array para almacenar las fechas encontradas
  let dates = [];

  // Iterar sobre cada string en el array
  lines.forEach((str) => {
    // Buscar coincidencias con las expresiones regulares en cada string
    const matchFullDate = str.match(fullDate);
    const matchWithoutTime = str.match(withoutTime);
    const matchTime = str.match(time);
    const matchMonthAndTime = str.match(monthAndTime);
    const matchWeekdayAndMonthDay = str.match(weekdayAndMonthDay);
    const matchMonthDayMonthAndTime = str.match(monthDayMonthAndTime);
    
    
    // Si se encuentra coincidencia de la fecha completa, se añade al array directamente
    if (matchFullDate) {
      dates = [...dates, ...matchFullDate]
    }

    // Si se encuentra coincidencia de la mes y la hora, significa que el último elemento contiene una fecha sin la hora, se la añadimos.
    else if (matchMonthAndTime) {
      dates[dates.length - 1] = `${dates[dates.length - 1]} ${[...matchMonthAndTime]}`
    }
    
    // Si se encuentra coincidencia de la fecha sin la hora, se añade al array directamente
    else if (matchWithoutTime) {
      dates = [...dates, ...matchWithoutTime]
    }
    
    // Si se encuentra coincidencia sólo de la hora, significa que el último elemento contiene el día de la semana y el mes, se la añadimos.
    else if (matchTime) {
      dates[dates.length - 1] = `${dates[dates.length - 1]} ${[...matchTime]}` 
    }
    
    // Si se encuentra coincidencia del día de la semana y el día del mes, se añade al array directamente
    else if (matchWeekdayAndMonthDay) {
      dates = [...dates, ...matchWeekdayAndMonthDay]
    }
    
    // Si se encuentra coincidencia de la fecha sin el día de la semana, se añade al array directamente
    else if (matchMonthDayMonthAndTime) {
      dates = [...dates, ...matchMonthDayMonthAndTime]
    }

  });

  // Devolver el array de fechas encontradas
  return dates;
}

const extractPrices = (lines) => {
  const regexPrice = /(\d+(\,\d{1,2})?)€/g;

  let prices = [];

  lines.forEach((str) => {
    const matchPrices = str.match(regexPrice);
    if (matchPrices) {
      prices = prices.concat(matchPrices);
    }
  });

  const spent = convertStringQuantityToCurrency(prices[0])
  const potentialReturn = convertStringQuantityToCurrency(prices[prices.length - 1])

  return {
    spent,
    potentialReturn
  };
}

const convertStringQuantityToCurrency = (stringQuantity) => {
  console.log(stringQuantity);
  const quantity = parseFloat(stringQuantity.replace(/[^\d\.,]/g, '').replace(',', '.'));

  if (!isNaN(quantity)) {
    return quantity;
  } else {
    console.error('No se pudo convertir el string a número.');
    return null;
  }
}

export const parseSelections = (selectionsArray) => {

  return selectionsArray.map(selection => ({name: selection, status: "pending"}))
}