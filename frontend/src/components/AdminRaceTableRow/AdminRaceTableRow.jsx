import React from 'react'

export default function AdminRaceTableRow({element}) {
    const openInputFields = () => {
        const inputs = document.getElementsByTagName('input');
        for(let i of inputs) {
            i.disabled = false
        }
      }
  return (
    <tr key={element.name}>
        <td>
            <input value={element.name} disabled />
        </td>
        <td>
            <input value={element.description} disabled />
        </td>
        <td>
            <input value={element.attributes.strength} disabled />
        </td>
        <td>
            <input value={element.attributes.agility} disabled />
        </td>
        <td>
            <input value={element.attributes.vitality} disabled />
        </td>
        <td>
            <input value={element.attributes.intelligence} disabled />
        </td>
        <td>
            <button onClick={() => {openInputFields()}}>Edit</button>
        </td>
    </tr>
  )
}
