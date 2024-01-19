import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import loginImage001Light from '@/assets/login-img002-light.png';
import loginImage001Dark from '@/assets/login-img002-dark.png';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import DarkImage from '@/components/ui/DarkImage.tsx';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(100),
  rememberMe: z.boolean(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div
      className={ `flex flex-col flex-wrap content-center justify-center h-screen bg-gradient-to-tr from-sky-300 via-sky-200 to-blue-100 dark:from-[#021018] dark:via-[#051e2d] dark:to-[#0a142e]` }>
      <div
        className={ `inline-flex flex-row justify-center items-center xl:border-2 border-black/90 flex-wrap h-3/4 overflow-clip rounded-xl max-w-fit` }>
        <div className={ `h-full hidden lg:flex max-w-[75%] basis-7/12` }>
          <DarkImage
            lightSrc={ loginImage001Light }
            darkSrc={ loginImage001Dark }
            alt={ 'Login Image' }
            className={ `w-full h-full` }
          />
        </div>
        <div className={ `pl-12 pr-12 h-full bg-background flex flex-col justify-center grow` }>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
              <FormField
                control={ form.control }
                name="username"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="me@example.com"
                        autoComplete="username"
                        { ...field }
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                ) }
              />

              <FormField
                control={ form.control }
                name="password"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        autoComplete="current-password"
                        { ...field }
                      />
                    </FormControl>
                    <FormDescription>
                      This is your private password.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                ) }
              />

              <FormField
                control={ form.control }
                name="rememberMe"
                render={ ({ field }) => (
                  <FormItem>
                    <div className={ `flex flex-row gap-2 items-center` }>
                      <FormControl>
                        <Switch
                          checked={ field.value }
                          onCheckedChange={ field.onChange }
                        />
                      </FormControl>
                      <FormLabel>Remember Me</FormLabel>
                    </div>
                    <FormDescription>
                      Stay logged in with this browser for up to 7 days.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                ) }
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
