/** @jsxRuntime classic */
/** @jsx jsx */
import React, { ChangeEvent } from 'react'
import { jsx } from 'theme-ui'
import { FaSearch } from 'react-icons/fa'

type SearchBarProps = {
  onChange: (query: string) => void
}

export function SearchBar(props: SearchBarProps): React.ReactElement {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value)
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
        />
      </div>
    </div>
  )
}
