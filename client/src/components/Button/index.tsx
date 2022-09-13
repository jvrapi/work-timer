
interface Props extends React.HTMLAttributes<HTMLButtonElement>{
  icon: JSX.Element
}

export function Button({icon, ...props}: Props){
return (<button className={`bg-primary text-primaryText px-5 py-2 rounded-xl`} {...props}>
             {icon}
            </button>)
}