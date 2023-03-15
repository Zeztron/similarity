import React from 'react'

interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  return (
  <div>Paragraph</div>
  )
}

export default Paragraph;
