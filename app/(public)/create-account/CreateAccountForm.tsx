'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// import { auth } from '@/utils/auth';
import { useToast } from '@/components/ui/sonner';
import { getAuthError } from '@/utils/error';
import { OAuthSignIn } from '@/components/auto/OAuthSignIn';

export function CreateAccountForm() {


    return (
        <Card className="w-96">

        </Card>
    )
}