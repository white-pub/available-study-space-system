// To let typescript recognize .jpg

declare module '*.jpeg' {
  const value: string;
  export default value;
}