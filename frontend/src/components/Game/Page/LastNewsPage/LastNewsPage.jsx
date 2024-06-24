import { useMutation } from '@tanstack/react-query'
import React from 'react'

export default function LastNewsPage() {
    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: async() => {
            try {
                
            } catch (error) {
                
            }
        }
    });
  return (
    <div>LastNewsPage</div>
  )
}
