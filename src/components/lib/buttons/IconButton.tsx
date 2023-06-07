type Props = {
  icon: React.ReactNode
}

export default function IconButton({ icon }: Props) {
  return (
    <button className='p-3 flex items-center justify-center border-[1px] border-neutral-200 rounded'>
      {icon}
    </button>
  )
}