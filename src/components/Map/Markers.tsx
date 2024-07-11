import { Marker } from 'react-leaflet'
import React from 'react'
import { Popup } from 'react-leaflet'

const Markers: React.FC<{position: [number, number][]}> = ({position}) => {
    return (
        <>
            {position.map((coords, index) => {
                return <Marker position={coords} key={index}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            })}
        </>
    )
}

export default Markers