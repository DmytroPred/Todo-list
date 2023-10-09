interface Props {
  title: string;
}

const FormTitle = ({ title }: Props) => {
  return <h3 className='text-xl font-bold'>{title}</h3>;
};

export default FormTitle;
