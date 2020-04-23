

export const obtenerListEstados = async()=>{
    const res = await fetch(`${process.env.REACT_APP_URL_API}/tornados/listEstados`)
    const data = res.json()
    return data
  }
export const obtenerTornadosPorEstadoId= async estadoId=>{
    const res = await fetch(`${process.env.REACT_APP_URL_API}/tornados/${estadoId}`)
    const data = res.json()
    return data
  }