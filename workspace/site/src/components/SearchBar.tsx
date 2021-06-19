/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, ChangeEvent } from 'react'
import { jsx } from 'theme-ui'
import { FaSearch } from 'react-icons/fa'

export function SearchBar(): React.ReactElement {
  const [value, setValue] = useState<string>('')

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <div
      sx={{
        gridColumn: '1 / -1',
        borderBottomWidth: 4,
        borderBottomStyle: 'solid',
        borderBottomColor: 'primary',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      }}
    >
      <FaSearch sx={{ display: 'inline-block', fontSize: 4, marginRight: 3 }} />
      <div
        sx={{
          flexGrow: 1,
        }}
      >
        <input
          onChange={onChange}
          sx={{
            p: 2,
            m: 1,
            width: '100%',
            color: 'text',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
            ':focus': {
              outline: 'none',
            },
          }}
          type="search"
          value={value}
        />
      </div>
    </div>
  )
}
