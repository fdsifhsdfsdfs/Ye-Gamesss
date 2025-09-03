'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { suggestGameTags } from '@/ai/flows/suggest-game-tags';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const addGameSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  gameUrl: z.string().url('Please enter a valid URL.'),
  image: z.custom<File>(val => val instanceof File, 'Please upload an image.').refine(file => file?.size <= 4 * 1024 * 1024, `Max image size is 4MB.`),
  tags: z.array(z.string()).min(1, 'Please add at least one tag.'),
});

type AddGameFormValues = z.infer<typeof addGameSchema>;

export function AddGameForm() {
  const [isAiLoading, startAiTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();

  const form = useForm<AddGameFormValues>({
    resolver: zodResolver(addGameSchema),
    defaultValues: {
      title: '',
      description: '',
      gameUrl: '',
      tags: [],
    },
  });

  const tags = form.watch('tags');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      const currentTags = form.getValues('tags');
      const newTags = [...new Set([...currentTags, tagInput.trim()])];
      form.setValue('tags', newTags, { shouldValidate: true });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    form.setValue('tags', newTags, { shouldValidate: true });
  };

  const handleSuggestTags = async () => {
    const description = form.getValues('description');
    if (!imagePreview || !description) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide a description and an image before suggesting tags.',
      });
      return;
    }

    startAiTransition(async () => {
      try {
        const result = await suggestGameTags({
          photoDataUri: imagePreview,
          description: description,
        });

        if (result.tags) {
          const currentTags = form.getValues('tags');
          const newTags = [...new Set([...currentTags, ...result.tags])];
          form.setValue('tags', newTags, { shouldValidate: true });
          toast({
            title: 'AI Suggestions Added!',
            description: 'New tags have been added to your list.',
          });
        }
      } catch (error) {
        console.error('Error suggesting tags:', error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not suggest tags. Please try again.',
        });
      }
    });
  };
  
  const onSubmit = (data: AddGameFormValues) => {
    toast({
      title: 'Game Submitted!',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, (key, value) => key === 'image' ? value.name : value, 2)}</code>
        </pre>
      ),
    });
    form.reset();
    setImagePreview(null);
  };

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Title</FormLabel>
                    <FormControl><Input placeholder="e.g. Cosmic Drift" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe your game..." rows={5} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gameUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game URL</FormLabel>
                    <FormControl><Input placeholder="https://example.com/play" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <FormLabel>Game Image</FormLabel>
                {imagePreview ? (
                  <div className="relative">
                    <Image src={imagePreview} alt="Game preview" width={300} height={169} className="rounded-md border aspect-video object-cover w-full" />
                    <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 h-8 w-8 rounded-full" onClick={() => { setImagePreview(null); form.resetField('image'); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormItem>
                <FormLabel>Tags</FormLabel>
                 <div className="flex gap-2">
                   <Input 
                     placeholder="Add a tag and press Enter" 
                     value={tagInput}
                     onChange={e => setTagInput(e.target.value)}
                     onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
                   />
                   <Button type="button" onClick={handleAddTag}>Add</Button>
                 </div>
                <div className="flex flex-wrap gap-2 mt-2 min-h-[2.5rem] p-2 border rounded-md bg-background">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1.5">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="rounded-full hover:bg-destructive/20 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <FormMessage className={cn(tags.length > 0 && "hidden")}>{form.formState.errors.tags?.message}</FormMessage>
              </FormItem>

              <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isAiLoading || !imagePreview || !form.getValues('description')} className="w-full">
                {isAiLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                )}
                Suggest Tags with AI
              </Button>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>Submit Game</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}